// src/components/NavBar.tsx
import React, { useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// @ts-ignore
import { Collapse } from 'bootstrap';

const NavBar: React.FC = () => {
    const navbarCollapseRef = useRef<HTMLDivElement>(null);
    const history = useHistory();

    const handleLinkClick = (path: string) => {
        history.push(path);
        if (navbarCollapseRef.current) {
            const bsCollapse = new Collapse(navbarCollapseRef.current, {
                toggle: false
            });
            bsCollapse.hide();
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            navbarCollapseRef.current &&
            !navbarCollapseRef.current.contains(event.target as Node)
        ) {
            const bsCollapse = new Collapse(navbarCollapseRef.current, {
                toggle: false
            });
            bsCollapse.hide();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="nav-link " aria-current="page" to="/home">Home</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                    ref={navbarCollapseRef}
                >
                    <div className="navbar-nav">
                        <span className="nav-link active" onClick={() => handleLinkClick('/login')}>Login</span>
                        <span className="nav-link" onClick={() => handleLinkClick('/register')}>Register</span>
                        <span className="nav-link" onClick={() => handleLinkClick('/add')}>Add Training</span>
                        <span className="nav-link" onClick={() => handleLinkClick('/trainings')}>Trainings</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
