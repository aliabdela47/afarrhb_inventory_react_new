
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from './icons/Icons';

interface Breadcrumb {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  actionButtonLink?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  actionButtonText,
  onActionButtonClick,
  actionButtonLink,
}) => {
  const renderActionButton = () => {
    if (!actionButtonText) return null;

    const buttonContent = (
      <>
        <PlusIcon className="h-5 w-5 mr-2" />
        {actionButtonText}
      </>
    );

    const buttonClasses =
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';

    if (actionButtonLink) {
      return (
        <Link to={actionButtonLink} className={buttonClasses}>
          {buttonContent}
        </Link>
      );
    }

    return (
      <button type="button" onClick={onActionButtonClick} className={buttonClasses}>
        {buttonContent}
      </button>
    );
  };

  return (
    <div className="mb-6">
      <nav className="text-sm font-medium text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.name} className="flex items-center">
              <Link to={crumb.href} className="hover:text-primary-500">
                {crumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            {title}
          </h2>
        </div>
        <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
