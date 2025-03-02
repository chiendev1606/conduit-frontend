import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public-layout')({
  component: PublicLayout,
});

function PublicLayout() {
  return <Outlet />;
}
