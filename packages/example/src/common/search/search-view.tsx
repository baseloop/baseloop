import React from 'react'
import Input from '../form/input'
import FormEntry from '../layout/form-entry'
import { SearchResult } from './search-result'
import styled from 'styled-components'
import { Atom } from '@baseloop/atom'
import { Observable } from 'rxjs'
import { useAtom, useObservable } from '@baseloop/hooks'

export interface Props {
  keyword: Atom<string>
  isSearching: Atom<boolean>
  searchResponse: Observable<SearchResult[]>
}

const StyledResultContainer = styled.div`
  display: flex;

  > div {
    margin: 2rem;
  }
`

export default function SearchView({ keyword, isSearching: isSearchingAtom, searchResponse }: Props) {
  const isSearching = useAtom(isSearchingAtom)
  const results = useObservable(searchResponse, [])

  return (
    <section>
      <h1>Search demo</h1>
      <p>This page demonstrates how to implement a simple search feature.</p>

      <FormEntry label="Type in the search keyword">
        <Input value={keyword} inputProps={{ autoFocus: true }} />
        {isSearching && <span>Searching...</span>}
      </FormEntry>

      {!isSearching && (
        <>
          <h1>Search results</h1>
          <StyledResultContainer>
            {results.map((result, i) => (
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
