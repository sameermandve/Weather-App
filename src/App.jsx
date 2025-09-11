// import WeatherAppPage from './pages/WeatherAppPage';
import { Loader } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {

    // Tried using lazy loading for practice purposes only 
    const LazyComponent = lazy(() => import('./pages/WeatherAppPage'));

    return (
        <>
            <Suspense
                fallback={
                    <div className='h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800'>
                        <Loader className='size-10 animate-spin text-white/90' />
                    </div>}
            >
                <LazyComponent />
            </Suspense>

            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            />
        </>
    );
}

export default App