/**
 * ProTask Backend API
 * RESTful API for Todo App - Inforge Integration Ready
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage (replace with database in production)
const tasks = new Map();
const users = new Map();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// API Key validation middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  // In production: validate against database
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
  req.userId = 'user_' + apiKey.slice(0, 8); // Simple user identification
  next();
};

// Validation schemas
const taskSchema = Joi.object({
  text: Joi.string().min(1).max(200).required(),
  completed: Joi.boolean().default(false),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().iso().optional()
});

const taskUpdateSchema = Joi.object({
  text: Joi.string().min(1).max(200).optional(),
  completed: Joi.boolean().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().iso().optional()
}).min(1);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'ProTask API'
  });
});

// Get all tasks
app.get('/api/tasks', validateApiKey, (req, res) => {
  const userTasks = Array.from(tasks.values())
    .filter(task => task.userId === req.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({
    success: true,
    count: userTasks.length,
    data: userTasks
  });
});

// Get single task
app.get('/api/tasks/:id', validateApiKey, (req, res) => {
  const task = tasks.get(req.params.id);
  
  if (!task || task.userId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json({ success: true, data: task });
});

// Create task
app.post('/api/tasks', validateApiKey, async (req, res) => {
  const { error, value } = taskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: error.details 
    });
  }
  
  const task = {
    id: uuidv4(),
    userId: req.userId,
    text: value.text,
    completed: value.completed,
    priority: value.priority,
    dueDate: value.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.set(task.id, task);
  
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
});

// Update task
app.put('/api/tasks/:id', validateApiKey, (req, res) => {
  const task = tasks.get(req.params.id);
  
  if (!task || task.userId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { error, value } = taskUpdateSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: error.details 
    });
  }
  
  const updatedTask = {
    ...task,
    ...value,
    updatedAt: new Date().toISOString()
  };
  
  tasks.set(task.id, updatedTask);
  
  res.json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask
  });
});

// Toggle task completion
app.patch('/api/tasks/:id/toggle', validateApiKey, (req, res) => {
  const task = tasks.get(req.params.id);
  
  if (!task || task.userId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.completed = !task.completed;
  task.updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    message: `Task marked as ${task.completed ? 'completed' : 'pending'}`,
    data: task
  });
});

// Delete task
app.delete('/api/tasks/:id', validateApiKey, (req, res) => {
  const task = tasks.get(req.params.id);
  
  if (!task || task.userId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.delete(req.params.id);
  
  res.json({
    success: true,
    message: 'Task deleted successfully'
  });
});

// Get stats
app.get('/api/stats', validateApiKey, (req, res) => {
  const userTasks = Array.from(tasks.values())
    .filter(task => task.userId === req.userId);
  
  const stats = {
    total: userTasks.length,
    completed: userTasks.filter(t => t.completed).length,
    pending: userTasks.filter(t => !t.completed).length,
    byPriority: {
      high: userTasks.filter(t => t.priority === 'high' && !t.completed).length,
      medium: userTasks.filter(t => t.priority === 'medium' && !t.completed).length,
      low: userTasks.filter(t => t.priority === 'low' && !t.completed).length
    }
  };
  
  res.json({ success: true, data: stats });
});

// Bulk operations
app.post('/api/tasks/bulk', validateApiKey, (req, res) => {
  const { action, ids } = req.body;
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'IDs array required' });
  }
  
  let processed = 0;
  
  switch (action) {
    case 'complete':
      ids.forEach(id => {
        const task = tasks.get(id);
        if (task && task.userId === req.userId) {
          task.completed = true;
          task.updatedAt = new Date().toISOString();
          processed++;
        }
      });
      break;
      
    case 'delete':
      ids.forEach(id => {
        const task = tasks.get(id);
        if (task && task.userId === req.userId) {
          tasks.delete(id);
          processed++;
        }
      });
      break;
      
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
  
  res.json({
    success: true,
    message: `${processed} tasks ${action}d`,
    processed
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║     ProTask API - Inforge Ready        ║
  ╠════════════════════════════════════════╣
  ║  Server running on port ${PORT}            ║
  ║  Health check: http://localhost:${PORT}/health ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
