import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Trabajos', href: '/trabajos', current: location.pathname === '/trabajos' },
    { name: 'Empleados', href: '/empleados', current: location.pathname === '/empleados' },
    {name : 'Pagos', href: '/pagos', current: location.pathname === '/pagos'},
    {name : 'Cobros', href: '/cobros', current: location.pathname === '/cobros'},
    { name: 'Vehiculos', href: '/vehiculos', current: location.pathname === '/vehiculos' },
    { name: 'Clientes', href: '/clientes', current: location.pathname === '/clientes' }
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const cerrarSesion = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
                {/* Menu desplegable */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Más
                  </button>
                  {dropdownOpen && (
                    <div className="absolute bg-gray-700 text-white py-2 mt-1 rounded-md">
                      <a href="/estadisticas" className="block px-4 py-2 text-sm hover:bg-gray-600">Estadisticas</a>
                      <a href="/tareas" className="block px-4 py-2 text-sm hover:bg-gray-600">Tareas</a>
                      <a href="/marcas" className="block px-4 py-2 text-sm hover:bg-gray-600">Marcas</a>
                      <a href="/modelos" className="block px-4 py-2 text-sm hover:bg-gray-600">Modelos</a>
                      <a href="/cheques" className="block px-4 py-2 text-sm hover:bg-gray-600">Cheques</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={cerrarSesion} className="text-white">Cerrar Sesión</button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
          {/* Mobile dropdown */}
          <Disclosure.Button className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
            Más
          </Disclosure.Button>
          <div className="space-y-1 pl-6">
            <a href="/opcion1" className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Opción 1</a>
            <a href="/opcion2" className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Opción 2</a>
            <a href="/opcion3" className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Opción 3</a>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}

export default Navbar