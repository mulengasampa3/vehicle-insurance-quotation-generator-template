import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Template } from '../../types/Templates';
import * as api from '../../api/templatesApi';

interface TemplatesState {
  templates: Template[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TemplatesState = {
  templates: [],
  status: 'idle',
};

// Fetch all templates
export const fetchTemplatesAsync = createAsyncThunk('templates/fetchTemplates', async () => {
  return await api.fetchTemplates();
});

// Fetch a single template by name and render it
export const fetchTemplateByNameAsync = createAsyncThunk(
  'templates/render',
  async ({ name, variables }: { name: string; variables: Record<string, any> }) => {
    return await api.renderTemplate(name, variables);
  }
);

// Create a new template
export const createTemplateAsync = createAsyncThunk(
  'templates/createTemplate',
  async ({ name, content }: { name: string; content: string }) => {
    return await api.createTemplate(name, content);
  }
);

// Update an existing template
export const updateTemplateAsync = createAsyncThunk(
  'templates/update',
  async ({ id, content }: { id: number; content: string }) => {
    return await api.updateTemplate(id, content);
  }
);

// Delete a template by ID
export const deleteTemplateAsync = createAsyncThunk('templates/deleteTemplate', async (id: number) => {
  await api.deleteTemplate(id);
  return id;
});

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplatesAsync.fulfilled, (state, action) => {
        state.templates = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createTemplateAsync.fulfilled, (state, action) => {
        state.templates.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(updateTemplateAsync.fulfilled, (state, action) => {
        const index = state.templates.findIndex((template) => template.id === action.payload.id);
        if (index !== -1) {
          state.templates[index] = action.payload;
        }
      })
      .addCase(deleteTemplateAsync.fulfilled, (state, action) => {
        state.templates = state.templates.filter((template) => template.id !== action.payload);
      })
      .addCase(fetchTemplateByNameAsync.fulfilled, (state, action) => {
        // Optional: Handle fetched template rendering data if needed
        state.status = 'succeeded';
      });
  },
});

export const selectTemplates = (state: { templates: TemplatesState }) => state.templates.templates;
export default templatesSlice.reducer;
