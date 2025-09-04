import { use } from 'react';
import type { User } from '../App';
import './UserHeader.css';

export function UserHeader({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);

  return (
    <div className="user-header">
      <div className="widget-name">
        <strong>Nome: </strong>
        <span>{user.name}</span>
      </div>
      <div className="widget-email">
        <strong>E-mail: </strong>
        <span>{user.email}</span>
      </div>
    </div>
  );
}
