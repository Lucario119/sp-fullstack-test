import HomeContent from '@/components/HomeContent';
import UsersDataProvider from '@/contexts/UsersContext';

export async function generateMetadata() {
  
  return {
	  title: 'CSV Project',
  };
}

export default async function Home() {

  return (
    <div className='overflow-x-hidden'>
      <UsersDataProvider>
	   	  <HomeContent/>
	    </UsersDataProvider>
    </div>
  );
}
