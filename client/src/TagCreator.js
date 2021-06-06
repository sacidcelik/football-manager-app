import { useState } from 'react';
import styled from 'styled-components/macro';
import DeleteButton from './images/close.png';

export default function TagCreator({
  tagType,
  tags,
  onUpdateTags,
  onRemoveTag,
}) {
  const [tag, setTag] = useState('');

  function handleChange(event) {
    setTag(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tag);
      setTag('');
    }
    if (tag === '' && event.key === 'Backspace') {
      const remainingTags = tags.slice(0, -1);
      onRemoveTag(remainingTags);
    }
  }

  function removeTag(tagToRemove) {
    /* const tagToRemove = event.target.previousSibling.wholeText; */
    const remainingTags = tags.filter((tag) => tag !== tagToRemove);
    onRemoveTag(remainingTags);
  }

  return (
    <TagWrapper>
      <label htmlFor="tag">Enter {tagType}</label>
      <Tags>
        {tags.map((tag, index) => {
          return (
            <Tag key={index + tag}>
              {tag}
              <img
                onClick={() => removeTag(tag)}
                src={DeleteButton}
                alt="Delete Tag"
              />
            </Tag>
          );
        })}
        <TagInput
          type="text"
          value={tag}
          name="tag"
          placeholder={`Add ${tagType} with Enter key`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          size={20}
        />
      </Tags>
    </TagWrapper>
  );
}

const TagWrapper = styled.section`
  display: grid;
  max-width: 450px;
`;

const Tags = styled.article`
  border: 1px solid lightblue;
  min-height: 40px;
  max-height: fit-content;
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  max-width: 450px;
`;

const TagInput = styled.input`
  border: none;
  display: inline;
  width: fit-content;
  height: 34px;
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;

const Tag = styled.span`
  background: hsl(160, 60%, 50%);
  padding: 0.3rem;
  border-radius: 10px;
  min-width: fit-content;
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  justify-content: space-between;

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
