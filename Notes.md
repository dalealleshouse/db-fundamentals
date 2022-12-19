# Other important theroms
- FLP Impossiblity
- CALM

# NoSQL, No Problem

NoSQL vs. RDBMS

Law of computation - any problem can be solved in any language

Type of NoSQL
- Key Value Stores - REDIS, ectcd, riak
- Wide Column Stores (Semi-schematic) - HBase, Cassandra
- Full Text Catalogs - Solr, Elasticsearch
- Graph Databases - Neo4j
- Document Stores - MongoDB, RavenDB, CouchDB

Perhaps no relational is a better name...

Common Attributes:
- Distributed Architecture 
    * runs on commodity hardware
    * redundant storage
    * geographic distribution

Compromises
- Eventual consistency
- write buffering
- tooling

Queries
- map reduce


CAP Theorem - Similar to project management, pick two
- Consistency - data in consistent state across nodes in a cluster
    - Absolute requirement for account balances and similar applications
    - Not that important for things like catalogs
- Partition Tolerance - data need not be all in one place together
- Availability - quick access to data
    - Absolute requirement for web scale

Relational - Consistency and Partition Tolerance
NoSQL - Partition Tolerance and Availability

It's about throughput - not speed

Relational is better for transactions and advanced reporting  (BI)
- No designed for BI or data warehousing
- Wide column stores are a bit of an exception to the advanced reporting rule
    (HBase and Hadoop)
- Big Data and NoSQL are interrelated
- Useful with ETL
- Big Data is a Compute scale solution, not a web scale solution
NoSQL is better for object persistence, scale, and complex data models

Adoption Questions:
- Is your data transaction based?
- Is it complex in structure?
- How varied are your queries?
- Do you do a lot of reporting?
- Is lost data (due to abortive sessions) tolerable?


Impetus
- Address "Web Scale"

- Impedance Mismatch
    * Relations data is stored in tables and rows, applications NEVER consume
        data this way.
    * Requires ORM
    * Objects are not tables and rows
    * Not all objects are alike

- Schema-less
    * Single document write scope - locks are not extended across collections

## MongoDB

https://www.simplethread.com/was-mongodb-ever-the-right-choice/
- In comments - MongoDB has transaction support
- In comments - Schema enforcement does not apply to existing documents

Solves Problems
- Schema less
- Easy Horizontal Scaling
- Ease of migrations
- write performance

Trade Offs:
- Loss of transactions (although MongoDB does have some support)
- Loss of relational integrity
- Ability to enforce data structure
- SQL Language and tooling ecosystem

Created in 2007 by 10gen, open sourced in 2009
2013 - 10get renamed themselves to MongoDB

mongo -> humongous

Official MongoDB Docs - https://docs.mongodb.com/manual/introduction/

Docker container documentation -
https://github.com/docker-library/docs/blob/master/mongo/README.md


Start Mongo
``` bash
docker-compose up
```

Shell Access
``` bash
# Connect to docker container
docker exec -it localmongo bash

# Start mongo shell
mongo

# List mongo commands
help

# Exit the mongo shell
exit
```

Dates always get changed to ISO

- Capped Collections
- Does not enforce schema - the responsibility is shifted to the consumer
    * Click Streams
    * Logging
    * Batch Imports
    * Vendor Integration

Replica Sets
- Primary DB - All writes happen here
- Secondary DB - Read Only, can have many, data replicated from primary
    eventually - will take over a primary if primary crashes
    * To read from a secondary, you must use db.setSlaveOk() - this is a
        connection level setting
- Arbiter DB - Will always vote for someone else in primary election, must have
    more than 50% of vote to become a primary. It has no data, sole purpose is
    to break the tie on elections - if you have an odd number of servers you
    don't need this

MongoDB Shell
- Shell is a JavaScript interrupter 
- .mongorc.js

Mongo Storage
- Data is stored in memory mapped files
- Stored in BSON : http://bsonspec.org/
    * Binary JSON - JavaScript Object Notation
    * Easy to convert to/from C data types
    * Lightweight
    * Traversable
    * Efficient
    * Small overhead associated with field name storage, but is necessary for
        schemaless storage

MongoDB Saving Data
- Must have an _id field
  * mongo will assign id if you do not specify one
  * Can use any data type (except array) but ObjectId is the best
      - consists of
        * 4 bytes representing seconds since Unix epoch
        * 3 byte machine identifier
        * 2 byte process id
        * 3 byte counter starting with a random value
    - ObjectId().getTimestamp()
    - improves index performance
- 16MB size limit

Collections
- Kinda like a table, but not really so don't think of them that way
- Logical groups of related documents
- It is NOT possible to issue commands across collections

Standard commands
- db.[collection].save will do an insert or update
- db.[collection].insert will fail if _id already exists
    * Not specifying an id will result in a new ObjectId
- db.[collection].update will do an atomic update within a document
    * options: one, many, upsert

Indexing
- basically creates a smaller collection that easier to search
- ordering allows for optimized search algorithms

Mongo index
- Types
    * Regular (B-Tree)
    * Geo - Optimized for geographical queries (can also be proximity of points
        to a center)
    * Text - full text search?
    * Hashed - used for sharding
    * TTL - Time to live, supports expiring documents - removes documents from
        the collection when they expire
- Sparse index will only create an index if it has a value, otherwise it will
    store nulls
- Indexes can have up to 32 fields

