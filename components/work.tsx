export function Work({ company, role, startAt, endAt, descriptions: descriptions, skills }: { company: string, role: string, startAt: string, endAt: string, descriptions: string[] | undefined, skills: string }) {
    return (
      <div>
        <div className="mt-6 flex items-center">
          <p className="pr-3 text-lg text-neutral-800 dark:text-neutral-100 tracking-tight">
            {role} at <b>{company}</b>
          </p>
          <hr className="flex-grow border-neutral-600 dark:border-neutral-500" />
          <p className="pl-3 text-neutral-800 dark:text-neutral-100">
            {startAt} - {endAt}
          </p>
        </div>
        <ul className="list-disc text-gray-600 dark:text-gray-400">
          {descriptions != undefined && descriptions.length > 0 && descriptions.map((description) => (
            <li className="mt-1">{description}</li>
          ))}
        </ul>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          <a className="mt-3 text-gray-600 dark:text-gray-100">Skills: </a>{skills}
        </p>
      </div>
    );
  }