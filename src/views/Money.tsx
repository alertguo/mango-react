import Layout from '../components/Layout';
import React, {useState} from 'react';
import {TagsSection} from './Money/TagsSection';
import {NotesSection} from './Money/NotesSection';
import TypeSection from './Money/TypeSection';
import NumberPadSection from './Money/NumberPadSection';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;
const defaultRecord = {
  tagIds: [] as number[],
  note: '',
  type: '-' as Type,
  amount: 0
};

type Type = '-' | '+'

function Money() {
  const [selected, setSelected] = useState(defaultRecord);
  const {records, addRecord} = useRecords();
  console.log('records');
  console.log(records);
  // Partial 可以只获取部分属性，不必要一一对应，全部都有
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({
      ...selected,
      ...obj
    });
  };
  const submit = () => {
    addRecord(selected);
    alert('已保存');
    setSelected(defaultRecord);
  };
  return (
    <MyLayout>
      {JSON.stringify(selected)}
      <TypeSection value={selected.type}
                   onChange={(type) => onChange({type})}/>
      <TagsSection value={selected.tagIds}
                   onChange={(tagIds) => onChange({tagIds})}/>
      <NotesSection value={selected.note}
                    onChange={(note) => onChange({note})}/>
      <NumberPadSection value={selected.amount}
                        onChange={(amount) => onChange({amount})}
                        onOk={submit}
      />
    </MyLayout>
  );
}

export default Money;