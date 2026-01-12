import { setActivePinia, createPinia } from 'pinia';
import { useTaskStore } from '../taskStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// 1. Mock Axios so we don't hit the real API
vi.mock('axios');

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Reset Pinia before each test
    vi.clearAllMocks(); // Clear previous axios calls
  });

  it('adds a task successfully', async () => {
    const store = useTaskStore();
    
    // Define the mock response from the "server"
    const mockTask = { _id: '123', title: 'Test Task', priority: 'High', isCompleted: false };
    (axios.post as any).mockResolvedValue({ data: mockTask });

    // Run the action
    await store.addTask('Test Task', 'High');

    // Assertions
    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0].title).toBe('Test Task');
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('calculates pending tasks correctly', () => {
    const store = useTaskStore();
    
    // Manually set state
    store.tasks = [
        { _id: '1', title: 'Task 1', priority: 'Low', isCompleted: true },
        { _id: '2', title: 'Task 2', priority: 'High', isCompleted: false }
    ] as any;

    expect(store.pendingTasksCount).toBe(1);
    expect(store.completedTasksCount).toBe(1);
  });
});