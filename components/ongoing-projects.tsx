import Link from "next/link";

export default function OngoingProjects() {
    const repos = [
        { project: 'Queue Server', url: 'https://github.com/bylucasqueiroz/queue-server', description: 'This project is an in-memory message queue system using gRPC in Go, inspired by AWS SQS.' },
        { project: 'Queue Infra', url: 'https://github.com/bylucasqueiroz/queue-infra', description: 'That repository is a part of a project that simulate a SQS Queue using Kubernetes Infrastructure.' }
    ];

    return (
        <div>
            {repos.map((repo) => (
                <div key={repo.project}>
                    <Link href={repo.url} className="no-underline" target="_blank">
                        <h3 className="my-2 before:content-['•'] before:mr-2 hover:text-blue-500">{repo.project}</h3>
                    </Link>
                    <p className="m-0 p-0">{repo.description}</p>
                </div>
            ))}
        </div>
    );
}