import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Service from "./pages/Service";
import ServiceRecruit from "./pages/ServiceRecruit";
import ServiceCreative from "./pages/ServiceCreative";
import ServiceSES from "./pages/ServiceSES";
import Company from "./pages/Company";
import Recruit from "./pages/Recruit";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import NewsAdmin from "./pages/admin/NewsAdmin";
import RecruitAdmin from "./pages/admin/RecruitAdmin";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story" component={Story} />
      <Route path="/service" component={Service} />
      <Route path="/service/recruit" component={ServiceRecruit} />
      <Route path="/service/creative" component={ServiceCreative} />
      <Route path="/service/ses" component={ServiceSES} />
      <Route path="/company" component={Company} />
      <Route path="/recruit" component={Recruit} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/contact" component={Contact} />
      {/* Admin routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/news" component={NewsAdmin} />
      <Route path="/admin/recruit" component={RecruitAdmin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
