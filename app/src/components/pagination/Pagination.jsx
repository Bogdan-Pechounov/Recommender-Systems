import React from 'react'
import usePagination from './usePagination'

import './pagination.scss'

function Pagination({ page, setPage, pageSize, numItems }) {
  const paginationRange = usePagination({ page, pageSize, numItems })

  return (
    <ul className='pagination'>
      <li
        key='left'
        className='arrow'
        onClick={() => setPage(Math.max(page - 1, 1))}
      >
        &lt;
      </li>
      {paginationRange.map((p, i) => {
        if (p === '...') {
          return (
            <li key={i} style={{ cursor: 'default' }}>
              {p}
            </li>
          )
        } else {
          return (
            <li
              key={i}
              onClick={() => setPage(p)}
              className={`item ${p === page ? 'selected' : ''}`}
            >
              {p}
            </li>
          )
        }
      })}

      <li
        key='right'
        className='arrow'
        onClick={() =>
          setPage(Math.min(page + 1, Math.ceil(numItems / pageSize)))
        }
      >
        &gt;
      </li>
    </ul>
  )
}

export default Pagination
