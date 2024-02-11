import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>About the Bot App</h1>
      <p>
        Welcome to the Bot App! This application allows you to build and manage your personal bot army.
        Whether you are a strategic mastermind or a casual player, our app provides you with a unique
        experience of selecting and organizing your bots for battle.
      </p>

      <h2>Features:</h2>
      <ul>
        <li>
          <strong>Bot Collection:</strong> Explore a diverse collection of bots, each with unique attributes
          such as armor, class, damage, and health.
        </li>
        <li>
          <strong>Enlist to Your Army:</strong> Enlist bots to create your ultimate army. Choose wisely as you can
          only have one bot from each class in your army. You have a chance to enlist six recruits.
        </li>
        <li>
          <strong>Manage Your Army:</strong> View and manage your bot army. Release bots if you need to make room
          for new recruits or discharge them from your army entirely.
        </li>
      </ul>

      <h2>How to Play:</h2>
      <ol>
        <li>Explore the Bot Collection to discover various bots and their attributes.</li>
        <li>Click on "Enlist to Your Army" to enlist bots to your personal army. Remember, you can enlist up to six recruits, one from each class.</li>
        <li>View and manage your bot army on the "Your Bot Army" page.</li>
        <li>Release bots to make room for new recruits or discharge them from your army.</li>
        <li>Strategically build a powerful and balanced army for victory!</li>
      </ol>

      <p>
        Get ready for an exciting adventure in the world of bots. Have fun playing and leading your bot army to
        victory!
      </p>
    </div>
  );
};

export default About;
