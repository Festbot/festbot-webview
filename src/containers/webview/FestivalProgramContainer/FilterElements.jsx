import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import DatePicker from 'material-ui/DatePicker';
import IconToday from 'material-ui/svg-icons/action/today';
import IconLocation from 'material-ui/svg-icons/maps/add-location';

const FilterElements = (props) => {
  
  console.log(props)
  let filterElements = '';
  if (props.isActiveFilter) {
    filterElements = (
      <div>
        <div style={{ position: 'relative' }}>
          <IconToday
            style={{
              position: 'absolute',
              right: 0,
              top: 15,
              width: 20,
              height: 20,
            
            }}
          />
          <DropDownMenu
            style={{  width: '100%',paddingTop: 5 }}
            multiple={true} 
          
            labelStyle={{paddingLeft: '0'}}
            maxHeight={300}
            underlineStyle={{margin: '0',width: '100%'}}
            selectedMenuItemStyle={{backgroundColor: '#90A4AE', color: 'white'}}
            value={props.SelectedDays}
            onChange={props.DateOnChange}
          >
            {props.EventDays}
          </DropDownMenu>
        </div>

        <div style={{ position: 'relative' }}>
          <IconLocation
            style={{
              position: 'absolute',
              right: 0,
              top: 20,
              width: 20,
              height: 20,
  
            }}
          />
          <DropDownMenu
            style={{  width: '100%',paddingTop: 5 }}
            multiple={true} 
          
            labelStyle={{paddingLeft: '0'}}
            maxHeight={300}
            underlineStyle={{margin: '0',width: '100%'}}
            selectedMenuItemStyle={{backgroundColor: '#90A4AE', color: 'white'}}
            value={props.LocationValue}
            onChange={props.LocationOnChange}
          >
            {props.LocationItems}
          </DropDownMenu>
        </div>
      </div>
    );
  }
  
  return <div>{filterElements}</div>
}

export default FilterElements
