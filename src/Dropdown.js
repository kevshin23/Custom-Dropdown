import React, { useState } from 'react';

export default function Dropdown({ title, items }) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);

    //Toggle dropdown
    const toggle = () => {
        setOpen(!open);
    }

    //Display selected items
    function displaySelected() {
        let selected = selection.map(item => (
            <li key={item.id} className='selected-item'>
                <span>
                    {item.value}
                </span>
                <span className='remove-selected-button' onClick={() => handleRemoval(item)}>
                    x
                </span>
            </li>
        ))
        return (
            <ul id='selectedItemsList' className='selected-items-list'>
                {selected}
            </ul>
        )
    }

    //Remove item
    function handleRemoval(item) {
        let afterRemoval = selection;
        afterRemoval = afterRemoval.filter(current => current.id !== item.id);
        setSelection([...afterRemoval]);
    }

    //Add item to selection or remove item if already selected
    function handleOnClick(item) {
        if (!selection.some(current => current.id === item.id)) {
            setSelection([...selection, item]);
        } else {
            handleRemoval(item);
        }
    }

    //If item has already been selected
    function isItemInSelection(item) {
        if (selection.some(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    function selectAll() {
        setSelection(items);
    }

    function deselectAll() {
        setSelection([])
    }

    return (
        <div className="dropdown-wrapper">
            <div
                tabIndex={0}
                className="dropdown-header"
                role="button"
            >
                {selection.length === 0 ?
                    <div className="dropdown-title-wrapper">
                        <span className="dropdown-title">{title}</span>
                    </div>
                    :
                    <div>
                        {displaySelected()}
                    </div>
                }

                <div className="action-wrapper">
                    <div className="select-options-wrapper">
                        <span className="select-option" onClick={() => selectAll()}>
                            Select All
                        </span>
                        <span className="select-option" onClick={() => deselectAll()}>
                            Deselect All
                        </span>
                    </div>
                    <div className="dropdown-action" role="button" onClick={() => toggle()}>
                        {/* <span>{open ? 'Close' : 'Open'}</span> */}
                        {open ?
                            <i className="arrow up"></i>
                            :
                            <i className="arrow down"></i>
                        }
                    </div>
                </div>
            </div>

            {open && (
                <div className="dropdown-list-wrapper">
                    <ul className="dropdown-list">
                        {items.map(item => (
                            <li className="dropdown-list-item" key={item.id}>
                                <input
                                    type="checkbox"
                                    name="state"
                                    id={item.id}
                                    value={item.value}
                                    onChange={() => handleOnClick(item)}
                                    checked={isItemInSelection(item) ? true : false}
                                />
                                <label className='list-item-name' htmlFor={item.id}>
                                    {item.value}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );
};