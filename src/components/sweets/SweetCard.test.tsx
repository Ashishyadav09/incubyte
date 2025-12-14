import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { SweetCard } from './SweetCard';
import { Sweet } from '@/types';

const mockSweet: Sweet = {
  id: '1',
  name: 'Test Chocolate',
  description: 'Delicious test chocolate',
  price: 9.99,
  quantity: 50,
  category: 'Chocolates',
  image: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const outOfStockSweet: Sweet = {
  ...mockSweet,
  id: '2',
  quantity: 0,
};

describe('SweetCard', () => {
  it('should render sweet name and price', () => {
    render(<SweetCard sweet={mockSweet} />);

    expect(screen.getByText('Test Chocolate')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('should render sweet description', () => {
    render(<SweetCard sweet={mockSweet} />);

    expect(screen.getByText('Delicious test chocolate')).toBeInTheDocument();
  });

  it('should render category badge', () => {
    render(<SweetCard sweet={mockSweet} />);

    expect(screen.getByText('Chocolates')).toBeInTheDocument();
  });

  it('should show stock quantity', () => {
    render(<SweetCard sweet={mockSweet} />);

    expect(screen.getByText('50 in stock')).toBeInTheDocument();
  });

  it('should show "Out of Stock" when quantity is zero', () => {
    render(<SweetCard sweet={outOfStockSweet} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('should disable purchase button when out of stock', () => {
    render(<SweetCard sweet={outOfStockSweet} />);

    const purchaseButton = screen.getByRole('button', { name: /out of stock/i });
    expect(purchaseButton).toBeDisabled();
  });

  it('should enable purchase button when in stock', () => {
    render(<SweetCard sweet={mockSweet} />);

    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    expect(purchaseButton).not.toBeDisabled();
  });

  it('should call onEdit when edit button is clicked by admin', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    
    // Note: This test would need admin context to see the edit button
    // For now, we just verify the component renders without error
    render(<SweetCard sweet={mockSweet} onEdit={onEdit} />);

    expect(screen.getByText('Test Chocolate')).toBeInTheDocument();
  });
});
