import 'react';
import { User } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/account');
    };

    return (
        <Button variant="outline-secondary" className="ms-3" onClick={handleClick}>
            <User size={20} />
        </Button>
    );
};

export default AccountIcon;
