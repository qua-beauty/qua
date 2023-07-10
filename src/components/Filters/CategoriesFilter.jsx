import { useSelector } from 'react-redux';
import { FilterCard } from './FilterCard';
import { CategoryOption } from './CategoryOption';
import { Flex } from '@chakra-ui/react'

export const CategoriesFilter = ({ onChange, selectedCategory }) => {
  const categories = useSelector(state => state.categories.data);

  const handleOptionClick = (category) => () => {
    onChange('category', category.id);
  }

  return categories && (
    <FilterCard title='Which category you are interesting in?' isExpanded={true}>
      <Flex flexWrap={'wrap'}>
        {categories.map(category => (
          <CategoryOption name={category.name} icon={category.icon} isSelected={category.id === selectedCategory} onClick={handleOptionClick(category)} />
        ))}
      </Flex>
    </FilterCard>
  )
}