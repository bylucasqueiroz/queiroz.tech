import Link from "next/link";

export default function OngoingProjects() {
    const repos = [
        { project: 'Queue Server', url: 'https://github.com/bylucasqueiroz/queue-server', description: 'This project is an in-memory message queue system using gRPC in Go, inspired by AWS SQS.' },
        { project: 'Queue Infra', url: 'https://github.com/bylucasqueiroz/queue-infra', description: 'That repository is a part of a project that simulate a SQS Queue using Kubernetes Infrastructure.' }
    ];

    return (
        <div>
            {repos.map((repo) => (
                <article key={repo.project} className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Link href={repo.url} className="no-underline">
                    <h4 className="text-xl font-semibold mb-1 hover:text-indigo-500 transition-colors">
                        {repo.project}
                    </h4>
                </Link>
                {repo.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {repo.description}
                    </p>
                )}
                </article>
            ))}
        </div>
    );
}