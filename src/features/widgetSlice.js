import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: nanoid(), name: 'Security Overview', content: 'Some widget text' },
      ],
    },
  ],
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, widget } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets.push({ ...widget, id: nanoid() });
      }
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
