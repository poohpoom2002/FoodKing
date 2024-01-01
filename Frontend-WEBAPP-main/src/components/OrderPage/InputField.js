import './InputField.css';

function InputField(props) {
    const { name, title, placeholder, value, handleChange } = props
    const object = {
        name: "jems",
        tel: "00000",
        ig: "jemss",
        age: "29"
    }
    
    return (
        <div className='input-field'>
            <label htmlFor={name}>{title}</label>
            <input onChange={handleChange} value={value} type="text" placeholder={placeholder} id={name} name={name}/>
        </div>
    );
}

export default InputField;