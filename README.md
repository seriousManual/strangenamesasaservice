# strangenamesasaservice

Strange Names As A Service provides an API set creates strange name combinations like "kind typhoon" or "lined ladybug" so you dont't have to.
Choose between arbitrary adjective-noun combinations, random alliterations or alliterations starting with your desired literal.

Running at http://strangenames.ernestly.com

## Multilingual

Specify your desired language by setting the `Accept-Language` header.

## Api

### /api/name

Arbitratry combination of adjective and noun.

### /api/alliteration

Arbitrary alliteration

### /api/alliteration/:letter?

Alliteration starting with :letter

## Contribution

Contributions are very welcome!

### roadmap

* more tests
* More languages (Until now only english is supported)
* More language resources
* until now snaas has no support for grammatical genders which is not a problem when it comes to english, but e.g. in german things are different
* refactor client scripts
