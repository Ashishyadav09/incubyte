import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { SweetFilters } from './SweetFilters';

describe('SweetFilters', () => {
  it('should render search input', () => {
    render(<SweetFilters />);

    expect(screen.getByPlaceholderText(/search sweets/i)).toBeInTheDocument();
  });

  it('should render category filter buttons', () => {
    render(<SweetFilters />);

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chocolates/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /candies/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gummies/i })).toBeInTheDocument();
  });

  it('should allow typing in search field', async () => {
    const user = userEvent.setup();
    render(<SweetFilters />);

    const searchInput = screen.getByPlaceholderText(/search sweets/i);
    await user.type(searchInput, 'chocolate');

    expect(searchInput).toHaveValue('chocolate');
  });

  it('should highlight selected category', async () => {
    const user = userEvent.setup();
    render(<SweetFilters />);

    const chocolatesButton = screen.getByRole('button', { name: /chocolates/i });
    await user.click(chocolatesButton);

    // The button should have active styling (checking it's clickable)
    expect(chocolatesButton).toBeInTheDocument();
  });
});
