import React from 'react'

import './genres-selector.scss'

//Select many genres to modify GET request
function GenresSelector({ genres, selected, setSelected }) {
  return (
    <div className='genres-selector'>
      {Object.keys(genres).map((genre, i) => (
        <div
          key={genre}
          className={`genre ${selected.includes(genre) ? 'selected' : ''}`}
          onClick={() => {
            //toggle
            console.log(selected, genre, [...selected, genre])
            if (selected.includes(genre)) {
              setSelected(selected.filter((g) => g !== genre))
            } else {
              setSelected([...selected, genre])
            }
          }}
        >
          {`${genre} (${genres[genre].count})`}
        </div>
      ))}
    </div>
  )
}

export default GenresSelector
