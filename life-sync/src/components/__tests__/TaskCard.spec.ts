import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import TaskCard from '../TaskCard.vue';

// Mock the store used inside TaskCard
vi.mock('../../stores/taskStore', () => ({
  useTaskStore: () => ({
    toggleTask: vi.fn(),
    deleteTask: vi.fn(),
  }),
}));

describe('TaskCard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the task title properly', () => {
    const mockTask = { 
        _id: '1', 
        title: 'Learn Vitest', 
        priority: 'High', 
        isCompleted: false 
    };

    const wrapper = mount(TaskCard, {
      props: { task: mockTask }
    });

    expect(wrapper.text()).toContain('Learn Vitest');
    expect(wrapper.text()).toContain('High');
  });

  it('applies strikethrough class when completed', () => {
    const completedTask = { 
        _id: '2', 
        title: 'Done Task', 
        priority: 'Low', 
        isCompleted: true 
    };

    const wrapper = mount(TaskCard, {
      props: { task: completedTask }
    });

    // Check for the line-through class you added in Tailwind
    const title = wrapper.find('h3');
    expect(title.classes()).toContain('line-through');
  });
});