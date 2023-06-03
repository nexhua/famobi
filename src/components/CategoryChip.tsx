import React from 'react';
import {type Category} from '../interfaces/Game';
import {Chip} from 'react-native-paper';

interface CategoryChipProps {
  category: Category;
  mode: 'flat' | 'outlined';
  toggle: (category: Category) => void;
}

function CategoryChip(props: CategoryChipProps): JSX.Element {
  return (
    <>
      <Chip mode={props.mode} onPress={() => props.toggle(props.category)}>
        {props.category}
      </Chip>
    </>
  );
}

export default CategoryChip;
