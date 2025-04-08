import './Categories.css';
import '../../index.css';
import { Category } from '../../types/global';
import classNames from 'classnames';

type Props = {
  categories: Category[];
  current: string | undefined;
  onChange: (id: Category) => void;
}

export const Categories:React.FC<Props> = ({
  categories, current, onChange
}) => {
  return (
    <div className="categories">
      <div className='categories-wrapper'>
        {categories && categories.map((cat) => 
          <div key={cat.idCategory} className={classNames('categories-item', { 'active': current === cat.idCategory })}>
          <button onClick={() => onChange(cat)}>
            {cat.strCategory}
          </button>
      </div>

      )}
      </div>
    </div>
  )
}