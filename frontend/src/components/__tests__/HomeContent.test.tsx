import { UsersDataContextProps } from '@/contexts/UsersContext';
import { useCsvUsersData } from '@/hooks/useCsvUserData';
import { uploadCsvFile } from '@/services/api';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeContent from '../HomeContent';
import { Input } from '../Input';

jest.mock('@/hooks/useCsvUserData');
jest.mock('@/services/api');

type UploadCsvFileMockType = jest.MockedFunction<(formData: FormData) => Promise<{ status: number; data: { message: string } }>>;

describe('HomeContent component', () => {
  beforeEach(() => {
    const mockUseCsvUsersData = useCsvUsersData as jest.MockedFunction<typeof useCsvUsersData>; 
    mockUseCsvUsersData.mockReturnValue({
      csvUsersData: [],
      isUploaded: false,
      setIsUploaded: jest.fn(),
    } as unknown as UsersDataContextProps); 
  });

  test('renders file upload section', () => {
    render(<HomeContent />);
    const uploadSection = screen.getByText('Upload your csv file');
    expect(uploadSection).toBeInTheDocument();
  });

  test('uploads file on button click', async () => {
    const file = new File(['csv content'], 'test.csv', { type: 'text/csv' });

    render(<HomeContent/>);
    const fileInput = screen.getByLabelText('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const mockUploadCsvFile = uploadCsvFile as UploadCsvFileMockType;
    mockUploadCsvFile.mockResolvedValueOnce({ status: 200, data: { message: 'File uploaded successfully' } });

    const uploadButton = screen.getByText('Upload File');
    fireEvent.click(uploadButton);

    await waitFor(() => expect(mockUploadCsvFile).toHaveBeenCalledWith(expect.any(FormData)));
    expect(screen.getByText('File uploaded successfully')).toBeInTheDocument();
  });

  test('removes file on button click', () => {
    const file = new File(['csv content'], 'test.csv', { type: 'text/csv' });

    render(<HomeContent/>);
    const fileInput = screen.getByLabelText('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const removeButton = screen.getByText('Remove File');
    fireEvent.click(removeButton);

    expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
  });

  test('calls searchCsvData when input value changes', async () => {
    const mockSearchCsvData = jest.fn();

    render(<Input/>);

    const inputElement = screen.getByPlaceholderText('Search csv data...');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    await waitFor(() => {
      expect(mockSearchCsvData).toHaveBeenCalledTimes(1);
      expect(mockSearchCsvData).toHaveBeenCalledWith('test');
    });
  });

  test('calls searchCsvData with an empty string when input value is cleared', async () => {
    const mockSearchCsvData = jest.fn();

    render(<Input/>);

    const inputElement = screen.getByPlaceholderText('Search csv data...');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => {
      expect(mockSearchCsvData).toHaveBeenCalledTimes(2); 
      expect(mockSearchCsvData).toHaveBeenCalledWith('');
    });
  });
});
