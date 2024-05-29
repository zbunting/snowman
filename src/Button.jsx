
/** Button to re-start a game of Snowman.
 *
 * Props:
 *  - click: function that calls all game's state setters
 *  - label: text displayed on button
*/
function Button({ click, label }) {
  return (
    <button
      className="Button"
      onClick={click}>
      {label}
    </button>
  );
}

export default Button;