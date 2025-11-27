describe("Form Tests", () => {
  beforeEach(() => {
    // Visit the home page and navigate to Card Sets
    cy.visit("/");
    cy.get("#cardSetPage").click();
    cy.get("[data-cy='study-set-header']").should("exist");
  });

  describe("Create Set Form", () => {
    beforeEach(() => {
      // Open the create set form
      cy.get("[data-cy='toggle_form']").click();
      cy.get("[data-cy='set_form']").should("be.visible");
    });

    it("should display the create set form when toggle button is clicked", () => {
      cy.get("[data-cy='set_form']").should("exist");
      cy.get("[data-cy='set_form'] input[name='titleInput']").should("exist");
      cy.get("[data-cy='set_form'] input[type='submit']").should("exist");
    });

    it("should successfully create a new set with valid input (happy path)", () => {
      const newSetTitle = "My New Study Set";

      // Fill in the form
      cy.get("[data-cy='set_form'] input[name='titleInput']").type(newSetTitle);

      // Submit the form
      cy.get("[data-cy='set_form'] input[type='submit']").click();

      // Verify the new set is displayed
      cy.contains(newSetTitle).should("exist");
    });

    it("should display an error when submitting an empty title (unhappy path)", () => {
      // Submit the form without entering a title
      cy.get("[data-cy='set_form'] input[type='submit']").click();

      // Verify error message is displayed
      cy.get(".error").should("exist");
      cy.get(".error").should("contain", "TITLE CANNOT BE EMPTY");
    });

    it("should display an error when submitting only whitespace", () => {
      // Enter only spaces
      cy.get("[data-cy='set_form'] input[name='titleInput']").type("   ");
      cy.get("[data-cy='set_form'] input[name='titleInput']").clear();

      // Submit the form
      cy.get("[data-cy='set_form'] input[type='submit']").click();

      // Verify error message is displayed
      cy.get(".error").should("exist");
    });
  });

  describe("Add Card Form", () => {
    beforeEach(() => {
      // Click on the first card set to open it
      cy.get("[data-cy='1']").click();

      // Open the add card form
      cy.get("[data-cy='toggle_form']").click();
      cy.get("[data-cy='card_form']").should("be.visible");
    });

    it("should display the add card form when toggle button is clicked", () => {
      cy.get("[data-cy='card_form']").should("exist");
      cy.get("[data-cy='card_form'] input[name='termInput']").should("exist");
      cy.get("[data-cy='card_form'] input[name='descriptionInput']").should("exist");
      cy.get("[data-cy='card_form'] input[type='submit']").should("exist");
    });

    it("should successfully add a new card with valid input (happy path)", () => {
      const newTerm = "New Term";
      const newDescription = "New Description";

      // Fill in the form
      cy.get("[data-cy='card_form'] input[name='termInput']").type(newTerm);
      cy.get("[data-cy='card_form'] input[name='descriptionInput']").type(newDescription);

      // Submit the form
      cy.get("[data-cy='card_form'] input[type='submit']").click();

      // Verify the card is added (the page should update)
      cy.contains(newTerm).should("exist");
    });

    it("should display an error when submitting with empty term (unhappy path)", () => {
      // Only fill in description
      cy.get("[data-cy='card_form'] input[name='descriptionInput']").type("A description");

      // Submit the form
      cy.get("[data-cy='card_form'] input[type='submit']").click();

      // Verify error message is displayed
      cy.get(".error").should("exist");
      cy.get(".error").should("contain", "TERM CANNOT BE EMPTY");
    });

    it("should display an error when submitting with empty description (unhappy path)", () => {
      // Only fill in term
      cy.get("[data-cy='card_form'] input[name='termInput']").type("A term");

      // Submit the form
      cy.get("[data-cy='card_form'] input[type='submit']").click();

      // Verify error message is displayed
      cy.get(".error").should("exist");
      cy.get(".error").should("contain", "DESCRIPTION CANNOT BE EMPTY");
    });

    it("should display an error when submitting with both fields empty (unhappy path)", () => {
      // Submit the form without entering anything
      cy.get("[data-cy='card_form'] input[type='submit']").click();

      // Verify error message is displayed
      cy.get(".error").should("exist");
      cy.get(".error").should("contain", "TERM AND DESCRIPTION CANNOT BE EMPTY");
    });
  });
});
