import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  error: any;
  resetErrorBoundary?: (...args: any[]) => void;
};

export default function FallbackRenderer({ error }: Props) {
  return (
    <div role="alert" className="container mx-auto p-4">
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">{error.message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
