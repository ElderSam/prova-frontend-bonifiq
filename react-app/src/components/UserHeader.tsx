import type { User } from '../App';

export function UserHeader({ user }: { user: User }) {
  return (
    <>
      <div className="widget-title">
        <strong>Nome: </strong>
        <span>{user.name}</span>
      </div>
      <div className="widget-email">
        <strong>E-mail: </strong>
        <span>{user.email}</span>
      </div>
    </>
  );
}
