
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ActivationButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigateToActivation = () => {
    navigate('/activate');
  };
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button onClick={handleNavigateToActivation} variant="outline">
        صفحة التفعيل
      </Button>
    </div>
  );
};

export default ActivationButton;
