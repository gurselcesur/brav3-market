import CircularText from './components/circular-text';


export default function Loading() {
  return (

    <CircularText
      text="▌▒█░▒█░░▒█▀▀█░▒█▄▄░░▒█░░▀▀▀░░▒█▄"
      onHover="speedUp"
      spinDuration={20}
      className="custom-class"
    />
  );
}