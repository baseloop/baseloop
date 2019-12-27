import { ajax } from 'rxjs/ajax'
import { isBrowser } from '@baseloop/core'
import { awaiting } from '@baseloop/rxjs'
import { Observable, of } from 'rxjs'
import { SearchResult } from './search-result'
import SearchView from './search-view'
import { debounceTime, delay, distinctUntilChanged, filter, shareReplay, startWith, switchMap } from 'rxjs/operators'
import * as React from 'react'
import { Atom } from '@baseloop/atom'

export default function SearchController() {
  const keyword = new Atom('')
  const searchRequest = keyword.pipe(
    filter(k => k != ''),
    debounceTime(400),
    distinctUntilChanged(),
    shareReplay()
  )
  const searchResponse = isBrowser
    ? searchRequest.pipe(
        switchMap<string, Observable<SearchResult[]>>((keyword: string) =>
          ajax.getJSON(`/api/search?keyword=${keyword}`)
        ),
        delay(2500),
        startWith([]),
        shareReplay()
      )
    : of([])
  const isSearching = awaiting(searchRequest, searchResponse)

  return {
    view: <SearchView keyword={keyword} isSearching={isSearching} searchResponse={searchResponse} />
  }
}
