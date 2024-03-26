import err from './error.jpg';
export default function Error404() {
  return (
    <div className='err'>
      <img
        src={err}
        alt="error404"
      />
    </div>
  );
}
