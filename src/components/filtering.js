import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;                        // используйте name как значение и текстовое содержимое                            
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля(что то не так)
        if (action && action.name === 'clear') {
    
        const parent = action.closest('[data-field]')?.parentElement || 
                    action.closest('.filter-container') ||
                    action.parentElement;
        
        if (parent) {
            const input = parent.querySelector('input');
            if (input) {
                input.value = '';
            }
        }
        
        const fieldName = action.dataset.field;
        if (fieldName) {
            state[fieldName] = '';
        }
    }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}