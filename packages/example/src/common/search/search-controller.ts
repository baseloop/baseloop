import { ajax } from 'rxjs/ajax'
import { awaiting, createReactiveElement, isBrowser, Model } from '@baseloop/core'
import { Observable, of } from 'rxjs'
import { SearchResult } from './search-result'
import SearchView from './search-view'
import { debounceTime, delay, distinctUntilChanged, filter, shareReplay, startWith, switchMap } from 'rxjs/operators'

export default function SearchController() {
  const keyword = new Model<string>('')
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
    view: createReactiveElement(SearchView, {
      keyword,
      keywordModel: of(keyword),
      isSearching,
      searchResponse: searchResponse
    })
  }
}
