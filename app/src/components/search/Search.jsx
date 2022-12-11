import Button from 'components/button/Button'
import Input from 'components/input/Input'

import './search.scss'

function Search({ title, setTitle }) {
  return (
    <div className='search'>
      <Input
        type='text'
        placeholder='Enter title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button className='small'>Search</Button>
    </div>
  )
}

export default Search
