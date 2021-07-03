import React, { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { date } from 'check-types';
import Select from 'react-select';
import { useAuth } from '../../../context/AuthContext';
import { database } from '../../../firebase/firebase';
import { useHistory } from 'react-router';

const PayFee = () => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const feesRef = database.ref('fees');
    const usersRef = database.ref(`users`);
    //const profileURL = usersRef.child(currentUser.uid).child(`profile`);
    const mdate = new Date()
    const [selectedDate, setSelectedDate] = useState(mdate);
    const [usersList, setUsersList] = useState('');
    const [paidUser, setPaidUser] = useState('');
    const [fee, setFee] = useState({
        
        paymentDate: '',
        paidAmount: '',
        paymentMode: '',
        course: '',
        user: '',
    });
    
    //console.log(currentUser);
    const options = [
        { value: 'CASH', label: 'CASH' },
        { value: 'ONLINE', label: 'ONLINE' },
      ]
    const usersOptions = []
    //console.log("options",options)
      useEffect(()=>{
        usersRef.on('value', snapshot => {
            if(snapshot.val() != null) {
                setUsersList({
                    ...snapshot.val()
                })
                
            }
        })
    },[])

    const usersKeys = Object.keys(usersList)
    //console.log("the users list",usersList[usersKeys[1]]);
    const handleSelectChange = (event) => {
        const getValue = event.value;
        setFee(fee => ({...fee, user: getValue, course: usersList[getValue].profile.course}));
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        //setFee(fee => ({...fee,  paymentDate: selectedDate}))

        try {
            // setError('');
            // setLoading(true);
            feesRef.push({
                paymentDate: fee.paymentDate.toLocaleDateString('en-GB') ,
                paidAmount: fee.paidAmount ,
                paymentMode: fee.paymentMode ,
                course: fee.course ,
                user: fee.user,
                
                
            });
            history.push("/all-payment");
            
        } catch {
            //setError("Couldn't create User Profile")
        }
        
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target 
        setFee(fee => ({...fee, [name]: value}))
    }
    let usersOptionsList = []
    if(usersList) {
        Object.keys(usersList).map(key => usersOptionsList.push({value: key, label: usersList[key].profile.first_name + ' ' + usersList[key].profile.last_name}))
    }
    

    return (
        <div className = "container">
            <div className = "row">
                <h1>Bill Form</h1>
            </div>
            <form onSubmit = {handleSubmit}>
                <div className = "mb-3" id = "user">
                    <label className = "form-label"> For User </label>
                    <Select   options={usersOptionsList} onChange = {handleSelectChange} />
                </div>
                <div className = "mb-3" id = "paidAmount">
                    <label className = "form-label"> Amount </label>
                    <input name = "paidAmount" className="form-control"  type = "text"  required onChange = {handleChange} value = {fee.totalAmount} />
                </div>
                <div className = "mb-3" id = "date">
                    <label className = "form-label"> Payment Date </label> <br />
                    <DatePicker className="form-control" placeholderText = "Select your date" selected = {selectedDate} onChange = {date => setFee(fee => ({...fee,  paymentDate: date}))} dateFormat = "dd/MM/yyyy"
                        showYearDropdown
                        scrollableMonthYearDropdown
                     />
                </div>
                <div className = "mb-3" id = "payment-mode">
                    <label className = "form-label"> Payment Mode </label>
                    <Select   options={options} onChange = {(event) => {
        const getValue = event.value;
        setFee(fee => ({...fee, paymentMode: getValue}));
        
    }} />
                </div>
                <button type = "submit" className = "btn btn-danger btn-lg btn-block" >Pay</button>
            </form>
            
        </div>
    )
}

export default PayFee

{/* <DatePicker placeholderText = "Select your date"
		selected = {selectedDate}
		onChange = {date => setSelectedDate(date)}
		isClearable

		onCalendarOpen = {() => alert("Calendar is opened") }
		onCalendarClose ={() => alert("Calendar is closed") }
/> */}





// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10


// Object.filter = (obj, predicate) => 
//     Object.keys(obj)
//           .filter( key => predicate(obj[key]) )
//           .reduce( (res, key) => (res[key] = obj[key], res), {} );


//Object.keys(usersList).filter(key => {value: key, label : usersList[key]})

//projects = Object.filter(projectObjects, projectObject => projectObject.course === profileObjects.course)