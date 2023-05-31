import '../../css/form.css'

export default function Error({ error }) {
  if (error) {
    return (
      <>
        <h4 className="error">{error?.message}</h4>
        <br />
      </>
    )
  } else {
    return (
      <br />
    )
  }
}
