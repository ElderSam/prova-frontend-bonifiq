import spinner from '../assets/spinner.svg';
import './Loading.css';

type LoadingProps = {
  text?: string;
  showSpinner?: boolean;
};

export function Loading({ text = "Carregando...", showSpinner = true }: LoadingProps) {
  return (
    <div className="loading">
      {showSpinner && <img src={spinner} alt="Carregando" className="loading-spinner" />}
      <span className="loading-text">{text}</span>
    </div>
  );
}
