 function Form() {
  const formBody = 
    <form>
      <label htmlFor='email'>Email here</label>
      <input type="email" placeholder="Enter your email" name="email" id="email" />
      <button type="submit">Submit here</button>
    </form>
  return formBody;
}

export default Form