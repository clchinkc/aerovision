import React from 'react';

function NavLink({ text }) {
  return (
    <a href="#" data-layername="link" className="gap-1 self-stretch">
      {text}
    </a>
  );
}

export default NavLink;
