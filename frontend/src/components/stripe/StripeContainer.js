import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCard from '../payment-card/PaymentCard';

const PUBLIC_KEY =
"pk_test_51LSvzlSDr67aca5VWkvF5mWBipmZ7q8Vq1dXxV2czrPJ7LzWQYEmVJXVCCER6wWahzkI0Xx8en09nvre4pgcqLQe00m6XOjPxq"
const stripePromise = loadStripe(PUBLIC_KEY);


export default function StripeContainer() {

  return (
    <Elements stripe={stripePromise}>
      <PaymentCard />
    </Elements>
  )
}
