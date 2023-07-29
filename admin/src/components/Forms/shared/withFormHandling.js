import FormHandler from "./FormHandler";

// The `withFormHandling` component
/**
 * A HOC that provides a form handling context to a component.
 * @param {{
 * initialState: Object,
 * validationRules: Object,
 * options: Object
 * }} ConfigurationObject
 * @returns {(Component: React.ComponentType) => React.ComponentType}
 */
const withFormHandling =
  ({ initialState, validationRules, options }) =>
  (Component) => {
    return (props) => {
      return (
        <FormHandler
          initialState={initialState}
          validationRules={validationRules}
          options={options}
          onSubmit={props.onSubmit}>
          <Component {...props} />
        </FormHandler>
      );
    };
  };

export default withFormHandling;
