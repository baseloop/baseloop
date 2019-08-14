import { Model } from '@baseloop/core'
import React from 'react'
import Input from '../form/input'
import FormEntry from '../layout/form-entry'
import { SearchResult } from './search-result'
import styled from 'styled-components'

export interface Props {
  keywordModel: Model<string>
  keyword: string
  isSearching: boolean
  searchResponse: SearchResult[]
}

const StyledResultContainer = styled.div`
  display: flex;

  > div {
    margin: 2rem;
  }
`

export default function SearchView({ keyword, keywordModel, isSearching, searchResponse }: Props) {
  return (
    <section>
      <h1>Search demo</h1>
      <p>This page demonstrates how to implement a simple search feature.</p>

      <FormEntry label="Type in the search keyword">
        <Input value={keyword} onChange={keywordModel.set} inputProps={{ autoFocus: true }} />
        {isSearching && <span>Searching...</span>}
      </FormEntry>

      {!isSearching && (
        <>
          <h1>Search results</h1>
          <StyledResultContainer>
            {searchResponse.map((result, i) => (
              <div key={i}>
                <div>{result.name}</div>
                <div>{result.age}</div>
              </div>
            ))}
          </StyledResultContainer>
        </>
      )}
    </section>
  )
}
